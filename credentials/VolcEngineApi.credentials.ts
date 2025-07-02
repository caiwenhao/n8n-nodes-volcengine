import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

import { volcEngineRegions } from '../nodes/VolcEngine/types';

export class VolcEngineApi implements ICredentialType {
	name = 'volcEngineApi';

	displayName = 'VolcEngine API';

	documentationUrl = 'https://www.volcengine.com/docs/6291/65568';

	icon: Icon = 'file:../nodes/VolcEngine/volcengine.svg';

	httpRequestNode = {
		name: 'VolcEngine',
		docsUrl: 'https://www.volcengine.com/docs/6291/65568',
		apiBaseUrl: 'https://open.volcengineapi.com',
	};

	properties: INodeProperties[] = [
		{
			displayName: 'Access Key ID',
			name: 'accessKeyId',
			type: 'string',
			required: true,
			default: '',
			description: 'VolcEngine Access Key ID obtained from VolcEngine Console Access Control page',
		},
		{
			displayName: 'Secret Access Key',
			name: 'secretAccessKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			required: true,
			default: '',
			description: 'VolcEngine Secret Access Key obtained from VolcEngine Console Access Control page',
		},
		{
			displayName: 'Region',
			name: 'region',
			type: 'options',
			options: volcEngineRegions,
			default: 'cn-beijing',
			description: 'VolcEngine service region',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'User-Agent': 'n8n-volcengine-node/1.0',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://open.volcengineapi.com',
			url: '/',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				Action: 'DescribeRegions',
				Version: '2020-04-01',
			}).toString(),
		},
	};
}
